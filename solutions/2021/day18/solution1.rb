require 'json'

class TreeBranch
  attr_accessor :entity, :parent, :depth, :left, :right

  def initialize(entity, parent, depth, left = nil, right = nil)
    @entity = entity
    @parent = parent
    @depth = depth
    @left = left
    @right = right
  end

  def to_s
    return entity.to_s if regular?

    "[#{left.to_s},#{right.to_s}]"
  end

  def to_a
    return entity if regular?

    [left.to_a, right.to_a]
  end

  def magnitude
    return entity if regular?

    3 * left.magnitude + 2 * right.magnitude
  end

  def regular?
    left.nil? && right.nil?
  end

  def leaf_pair?
    !regular? && left.regular? && right.regular?
  end

  def explodable?
    leaf_pair? && depth >= 4
  end

  def splittable?
    regular? && entity >= 10
  end

  def first_explodable_branch
    return self if explodable?
  
    left&.first_explodable_branch || right&.first_explodable_branch
  end

  def first_splittable_branch
    return self if splittable?
  
    left&.first_splittable_branch || right&.first_splittable_branch
  end

  def find_leftmost_number
    return self if regular?

    left&.find_leftmost_number || right&.find_leftmost_number
  end

  def find_rightmost_number
    return self if regular?

    right&.find_rightmost_number || left&.find_rightmost_number
  end

  def explode
    node = self
    while node.parent && node.parent.left == node
      node = node.parent
    end
    if node.parent
      node = node.parent.left.find_rightmost_number
      node.entity += left.entity if node
    end

    node = self
    while node.parent && node.parent.right == node
      node = node.parent
    end
    if node.parent
      node = node.parent.right.find_leftmost_number
      node.entity += right.entity if node
    end

    self.left = nil
    self.right = nil
    self.entity = 0
  end

  def split
    self.left = TreeBranch.new(entity / 2, self, depth + 1)
    self.right = TreeBranch.new(entity.fdiv(2).ceil, self, depth + 1)
  end

  def reduce
    loop do
      explodable_branch = first_explodable_branch
      if explodable_branch
        explodable_branch.explode
        next
      end

      splittable_branch = first_splittable_branch
      if splittable_branch
        splittable_branch.split
        next
      end

      break
    end
  end
end

def create_tree(entity, parent = nil, depth = 0)
  branch = TreeBranch.new(entity, parent, depth)

  return branch unless entity.is_a?(Array)

  branch.left = create_tree(entity[0], branch, depth + 1)
  branch.right = create_tree(entity[1], branch, depth + 1)

  branch
end

def first_explodable_branch(root)
  return root if root.nil? || root.explodable?

  first_explodable_branch(root.left) || first_explodable_branch(root.right)
end

sum = nil

File.read(File.join(File.dirname(__FILE__), 'input.txt')).each_line do |line|
  array = JSON.parse(line)
  sum = sum ? [sum, array] : array
  
  root = create_tree(sum)
  root.reduce

  sum = root.to_a
end

puts create_tree(sum).magnitude